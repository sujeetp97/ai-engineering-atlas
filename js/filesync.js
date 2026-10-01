/* ============================================================
   AI Engineering Atlas — keep progress synced to a file the user chose.

   Uses the File System Access API (Chromium browsers). The chosen file's
   handle is remembered in IndexedDB so the next visit can resume from it;
   browsers require one click to re-grant access after a reload.
   No DOM/UI here — app.js owns the interface.

     AtlasFileSync.supported            // false in Firefox/Safari
     AtlasFileSync.restore()   -> Promise<{ name, permission } | null>
     AtlasFileSync.connectNew() -> Promise<{ name, text }>   // save picker; text = existing contents ("" if new)
     AtlasFileSync.openExisting() -> Promise<{ name, text }> // open picker
     AtlasFileSync.requestAccess() -> Promise<boolean>       // needs a user gesture
     AtlasFileSync.read()      -> Promise<string>
     AtlasFileSync.write(text) -> Promise<void>
     AtlasFileSync.revert()    -> Promise<string|null> // undo the last pick; back to the previous file (its name) or none
     AtlasFileSync.disconnect() -> Promise<void>
     AtlasFileSync.name()      -> string | null
   ============================================================ */
(function (root) {
  "use strict";

  var supported = typeof root.showSaveFilePicker === "function" && typeof root.indexedDB !== "undefined";
  var DB = "atlas-filesync", STORE = "handles", KEY = "progress";
  var FILE_TYPES = [{ description: "Atlas progress", accept: { "application/json": [".json"] } }];
  var handle = null;
  var previous = null;   // the file before the latest pick, for revert()

  // ---- tiny IndexedDB key/value for the file handle ----
  function idb(mode, fn) {
    return new Promise(function (resolve, reject) {
      var open = indexedDB.open(DB, 1);
      open.onupgradeneeded = function () { open.result.createObjectStore(STORE); };
      open.onerror = function () { reject(open.error); };
      open.onsuccess = function () {
        var db = open.result, tx = db.transaction(STORE, mode), req = fn(tx.objectStore(STORE));
        tx.oncomplete = function () { db.close(); resolve(req && req.result); };
        tx.onerror = function () { db.close(); reject(tx.error); };
      };
    });
  }
  function saveHandle(h) { return idb("readwrite", function (s) { return s.put(h, KEY); }); }
  function loadHandle() { return idb("readonly", function (s) { return s.get(KEY); }); }
  function clearHandle() { return idb("readwrite", function (s) { return s.delete(KEY); }); }

  var RW = { mode: "readwrite" };

  function readHandle(h) {
    return h.getFile().then(function (f) { return f.text(); });
  }

  function adopt(h) {
    previous = handle;
    handle = h;
    return saveHandle(h).catch(function () { /* remembering is best-effort */ }).then(function () { return h; });
  }

  var api = {
    supported: supported,

    name: function () { return handle ? handle.name : null; },

    // Remembered file from a previous visit, and whether we may still write it
    // ("granted") or need a click first ("prompt").
    restore: function () {
      if (!supported) return Promise.resolve(null);
      return loadHandle().then(function (h) {
        if (!h) return null;
        handle = h;
        return h.queryPermission(RW).then(function (permission) { return { name: h.name, permission: permission }; });
      }).catch(function () { return null; });
    },

    // Pick where to save. If the user picks an existing file, its contents are
    // returned (the picker doesn't truncate until we write) so they can be merged.
    connectNew: function () {
      return root.showSaveFilePicker({ suggestedName: "atlas-progress.json", types: FILE_TYPES })
        .then(adopt)
        .then(function (h) { return readHandle(h).then(function (text) { return { name: h.name, text: text }; }); });
    },

    // Pick a previous progress file to resume from, then ask to write back to it.
    openExisting: function () {
      return root.showOpenFilePicker({ types: FILE_TYPES, multiple: false })
        .then(function (hs) { return adopt(hs[0]); })
        .then(function (h) { return readHandle(h).then(function (text) { return { name: h.name, text: text }; }); });
    },

    requestAccess: function () {
      if (!handle) return Promise.resolve(false);
      return handle.requestPermission(RW).then(function (p) { return p === "granted"; }).catch(function () { return false; });
    },

    read: function () {
      if (!handle) return Promise.reject(new Error("No progress file connected"));
      return readHandle(handle);
    },

    write: function (text) {
      if (!handle) return Promise.reject(new Error("No progress file connected"));
      return handle.createWritable().then(function (w) {
        return w.write(text).then(function () { return w.close(); });
      });
    },

    revert: function () {
      handle = previous;
      previous = null;
      return (handle ? saveHandle(handle) : clearHandle()).catch(function () {})
        .then(function () { return handle ? handle.name : null; });
    },

    disconnect: function () {
      handle = null;
      return clearHandle().catch(function () {});
    },
  };

  root.AtlasFileSync = api;
})(typeof window !== "undefined" ? window : this);

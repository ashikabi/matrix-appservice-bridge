/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Create a remote room.
 * @constructor
 * @param {string} identifier The ID for this room
 * @param {Object=} data The key-value data object to assign to this room.
 */
function RemoteRoom(identifier, data) {
    this.roomId = identifier;
    this.data = data || {};
}

/**
 * Get the room ID.
 * @return {string} The room ID
 */
RemoteRoom.prototype.getId = function() {
    return this.roomId;
};

/**
 * Serialize all the data about this room, excluding the room ID.
 * @return {Object} The serialised data
 */
RemoteRoom.prototype.serialize = function() {
    return this.data;
};

/**
 * Get the data value for the given key.
 * @param {string} key An arbitrary bridge-specific key.
 * @return {*} Stored data for this key. May be undefined.
 */
RemoteRoom.prototype.get = function(key) {
    return this.data[key];
};

/**
 * Set an arbitrary bridge-specific data value for this room.
 * @param {string} key The key to store the data value under.
 * @param {*} val The data value. This value should be serializable via
 * <code>JSON.stringify(data)</code>.
 */
RemoteRoom.prototype.set = function(key, val) {
    this.data[key] = val;
};

/** The RemoteRoom class. */
module.exports = RemoteRoom;

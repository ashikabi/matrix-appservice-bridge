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
 * Construct a Matrix user.
 * @constructor
 * @param {string} userId The user_id of the user.
 * @param {Object=} data Serialized data values
 * @param {boolean} escape [true] Escape the user's localpart. Modify {@link MatrixUser~ESCAPE_DEFAULT}
 *                  to change the default value.
 */
function MatrixUser(userId, data, escape=MatrixUser.ESCAPE_DEFAULT) {
    if (!userId) {
        throw new Error("Missing user_id");
    }
    if (data && Object.prototype.toString.call(data) !== "[object Object]") {
        throw new Error("data arg must be an Object");
    }
    this.userId = userId;
    const split = this.userId.split(":");
    this.localpart = split[0].substring(1);
    this.host = split[1];
    if (escape) {
        this.escapeUserId();
    }
    this._data = data || {};
}

/**
 * Get the matrix user's ID.
 * @return {string} The user ID
 */
MatrixUser.prototype.getId = function() {
    return this.userId;
};

/**
 * Get the display name for this Matrix user.
 * @return {?string} The display name.
 */
MatrixUser.prototype.getDisplayName = function() {
    return this._data.displayName;
};

/**
 * Set the display name for this Matrix user.
 * @param {string} name The Matrix display name.
 */
MatrixUser.prototype.setDisplayName = function(name) {
    this._data.displayName = name;
};

/**
 * Set an arbitrary bridge-specific data value for this user.
 * @param {string} key The key to store the data value under.
 * @param {*} val The data value. This value should be serializable via
 * <code>JSON.stringify(data)</code>.
 */
MatrixUser.prototype.set = function(key, val) {
    this._data[key] = val;
};

/**
 * Get the data value for the given key.
 * @param {string} key An arbitrary bridge-specific key.
 * @return {*} Stored data for this key. May be undefined.
 */
MatrixUser.prototype.get = function(key) {
    return this._data[key];
};

/**
 * Serialize all the data about this user, excluding the user ID.
 * @return {Object} The serialised data
 */
MatrixUser.prototype.serialize = function() {
    this._data.localpart = this.localpart;
    return this._data;
};

/**
 * Make a userId conform to the matrix spec using QP escaping.
 * Grammar taken from: https://matrix.org/docs/spec/appendices.html#identifier-grammar
 */
MatrixUser.prototype.escapeUserId = function() {
    // NOTE: Currently Matrix accepts / in the userId, although going forward it will be removed.
    // NOTE: We also allow uppercase for the time being.
    const badChars = new Set(this.localpart.replace(/([A-Z]|[a-z]|[0-9]|-|\.|=|_)+/g, ""));
    let res = this.localpart;
    badChars.forEach((c) => {
        const hex = c.charCodeAt(0).toString(16).toLowerCase();
        res = res.replace(
            new RegExp(`\\${c}`, "g"),
            `=${hex}`
        );
    });
    this.localpart = res;
    this.userId = `@${this.localpart}:${this.host}`;
};

/**
 * @static
 * This is a global variable to modify the default escaping behaviour of MatrixUser.
 */
MatrixUser.ESCAPE_DEFAULT = true;


/** The MatrixUser class */
module.exports = MatrixUser;

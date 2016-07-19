/**
 * Class taken from sigma.js
 * https://github.com/jacomyal/sigma.js  -> sigma.js/test/unit.configurable.js
 *
 * This is the only part we need from sigma.js and we can add more method to fulfill our needs
 *
 * Licence:
 *
 * Copyright (C) 2013-2014, Alexis Jacomy, http://sigmajs.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import Configurable from '../../js/utils/Configurable';

test('Basic manipulation', function() {
    var settings = new Configurable.configurable();
    settings('mySetting', 42);
    deepEqual(settings('mySetting'), 42, 'First attribution works. (single key)');
    settings('mySetting', 123);
    deepEqual(settings('mySetting'), 123, 'Overriding works. (single key)');
    settings({mySetting: 456});
    deepEqual(settings('mySetting'), 456, 'Overriding works. (multi keys)');

    (settings({mySetting: 'abc'}, 'mySetting'), 'abc', 'Filtering works. (when key is present)');
    (settings({hisSetting: 'abc'}, 'mySetting'), 456, 'Filtering works. (when key is present)');

    settings = new Configurable.configurable({mySetting: 42});
    deepEqual(settings('mySetting'), 42, 'Attribution works. (from the constructor)');
});

test('Embed objects', function() {
    var data = { key1: 'data', key2: 'data' },
        object = { key1: 'object' },
        settings = new Configurable.configurable(data),
        embedSettings = settings.embedObjects(object);

    deepEqual(embedSettings('key2'), 'data', 'Embedded overriding works 1.');
    deepEqual(embedSettings('key1'), 'object', 'Embedded overriding works 2.');
    deepEqual(embedSettings({ key1: 'onthefly' }, 'key1'), 'onthefly', 'Embedded overriding works 3.');
});

test('Deeply embed objects', function() {
    var data = { key1: 'data', key2: 'data', key3: 'data' },
        object1 = { key1: 'object1', key2: 'object1' },
        object2 = { key1: 'object2' },
        settings = new Configurable.configurable(data),
        embedSettings1 = settings.embedObjects(object1),
        embedSettings2 = embedSettings1.embedObjects(object2);

    deepEqual(embedSettings2('key3'), 'data', 'Deeply embedded overriding works 1.');
    deepEqual(embedSettings2('key2'), 'object1', 'Deeply embedded overriding works 2.');
    deepEqual(embedSettings2('key1'), 'object2', 'Deeply embedded overriding works 3.');
    deepEqual(embedSettings2({ key1: 'onthefly' }, 'key1'), 'onthefly', 'Deeply embedded overriding works 4.');
});

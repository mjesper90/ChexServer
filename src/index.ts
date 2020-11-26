var protobuf = require("protobufjs");
var protobuf = require("protobufjs/light");
import { Point, Hex, Layout } from './libs/hexlib';

protobuf.load("src/proto/player.proto", function(err, root) {
    if (err)
        throw err;
 
    // Obtain a message type
    var PPlayer = root.lookupType("playerpackage.ProtoPlayer");
 
    // Exemplary payload
    var payload = { clientId: "flerp" };
 
    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = PPlayer.verify(payload);
    if (errMsg)
        throw Error(errMsg);
 
    // Create a new message
    var message = PPlayer.create(payload); // or use .fromObject if conversion is necessary
 
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = PPlayer.encode(message).finish();
    // ... do something with buffer
 
    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = PPlayer.decode(buffer);
    // ... do something with message
 
    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
 
    // Maybe convert the message back to a plain object
    var object = PPlayer.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
    console.log(object)
});

var layout = new Layout(Layout.flat, new Point(1,1) ,new Point(122,272));

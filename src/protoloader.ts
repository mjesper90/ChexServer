var protobuf = require("protobufjs");
var protobuf = require("protobufjs/light");


export class Player 
{
    ClientId : string;
    ServerId : string;
    Username : string;
    ClientPassword: string;
    PPlayer1 : any;

    constructor(username : string, clientid : string, serverid : string, clientpass : string){
        this.ServerId = serverid;
        this.ClientId = clientid;
        this.Username = username;
        this.ClientPassword = clientpass;
        

    }

    Serialize(){
        protobuf.load("src/proto/player.proto", (err:any, root:any) =>  {
            if (err) 
                throw err;
         
            // Obtain a message type
            var PPlayer = root.lookupType("playerpackage.ProtoPlayer");
         
            // Exemplary payload
            var payload = { clientId: this.ClientId, 
                            serverId : this.ServerId,
                            clientUsername : this.Username,
                            clientPassword : this.ClientPassword
                            };

         
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
            })

            return object;
        }).then(() => {
            this.PPlayer1 = object;
            console.log("===")
            console.log(this.PPlayer1);
            console.log("===")
        });
    }

    Deserialize(){

    }
}


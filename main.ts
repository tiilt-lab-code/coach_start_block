input.onButtonPressed(Button.AB, function () {
    radio.sendString("set")
    basic.pause(randint(2000, 4000))
    radio.sendString("set")
    music.playTone(262, music.beat(BeatFraction.Whole))
    start_time = control.millis()
})
radio.onReceivedString(function (receivedString) {
    c_index = list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    if (receivedString == "pair") {
        if (list.length >= 8) {
            radio.sendString("full")
        } else {
            if (c_index < 0) {
                list.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
                c_index = list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))
            }
            radio.sendValue(convertToText(c_index + 1), radio.receivedPacket(RadioPacketProperty.SerialNumber))
        }
    } else if (receivedString == "movement") {
        c_time = radio.receivedPacket(RadioPacketProperty.Time) - control.millis()
        datalogger.log(datalogger.createCV(convertToText(c_index + 1), c_time), datalogger.createCV("", 0))
    }
})
let c_time = 0
let c_index = 0
let start_time = 0
let list: number[] = []
basic.showLeds(`
    . # # # .
    # . . . .
    # . . . .
    # . . . .
    . # # # .
    `)
radio.setGroup(11)
list = []
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
basic.forever(function () {
	
})

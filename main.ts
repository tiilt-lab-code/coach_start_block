input.onButtonPressed(Button.AB, function () {
    reaction_times = []
    radio.sendString("set")
    basic.pause(randint(1500, 3000))
    radio.sendString("start")
    start_time = control.millis()
    music.playTone(262, music.beat(BeatFraction.Whole))
})
radio.onReceivedString(function (receivedString) {
    c_index = list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    c_time = control.millis()
    if (receivedString == "pair") {
        if (list.length >= 4) {
            radio.sendString("full")
        } else {
            if (c_index < 0) {
                list.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
                c_index = list.indexOf(radio.receivedPacket(RadioPacketProperty.SerialNumber))
            }
            radio.sendValue(convertToText(c_index + 1), radio.receivedPacket(RadioPacketProperty.SerialNumber))
        }
    } else if (receivedString == "movement") {
        datalogger.log(
        datalogger.createCV("lane", convertToText(c_index + 1)),
        datalogger.createCV("time", c_time - start_time),
        datalogger.createCV("system", 1)
        )
    }
})
radio.onReceivedValue(function (name, value) {
    datalogger.log(
    datalogger.createCV("lane", name),
    datalogger.createCV("time", value),
    datalogger.createCV("system", 0)
    )
    reaction_times.insertAt(parseFloat(name) - 1, value)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    for (let index = 0; index <= reaction_times.length; index++) {
        basic.showNumber(index + 1)
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
        basic.showNumber(reaction_times[index])
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
    }
})
let c_time = 0
let c_index = 0
let start_time = 0
let reaction_times: number[] = []
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
reaction_times = []

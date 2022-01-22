import easymidi from 'easymidi'
import * as bunyan from 'bunyan'

declare global {
    var logger: bunyan
}

globalThis.logger = bunyan.createLogger({
    name: "Node MIDI Test"
})

logger.info("Starting")

const inputDevices = easymidi.getInputs()
inputDevices.forEach(deviceName => {
    logger.info({ deviceName }, "Found MIDI input")
    let inputDevice = new easymidi.Input(deviceName)
    inputDevice.on('cc', function (data) {
        logger.info(
            {
                ...data,
                controller: deviceName,
                value: Math.trunc(data.value / 127 * 100)
            },
            "Got control change"
        )
    })
})

const MESH_100LE = Obniz.getPartsClass('MESH_100LE');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100LE.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const ledBlock = new MESH_100LE(peripheral);

    // Connect to the Button block
    await ledBlock.connectWait();
    console.log(`connected: ${ledBlock.peripheral.localName}`);

    const colors = {
      red: 15, // Set LED-Red in the range of 0 to 127.
      green: 63, // Set LED-Green in the range of 0 to 127.
      blue: 0, // Set LED-Blue in the range of 0 to 127.
    };
    const totalTime = 10000; // Set the total control time in the range of 0 to 65,535[ms].
    const cycleOnTime = 1000; // Set the light on time in cycle in the range of 0 to 65,535[ms].
    const cycleOffTime = 500; // Set the light off time in cycle in the range of 0 to 65,535[ms].
    const pattern = MESH_100LE.Pattern.FIREFLY; // Set the blinking pattern to blink or firefly.

    ledBlock.setLed(colors, totalTime, cycleOnTime, cycleOffTime, pattern);
  };

  await obniz.ble.scan.startWait();
};

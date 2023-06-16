const MESH_100GP = Obniz.getPartsClass('MESH_100GP');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100GP.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const gpioBlock = new MESH_100GP(peripheral);

    // Connect to the GPIO block
    await gpioBlock.connectWait();
    console.log(`connected: ${gpioBlock.peripheral.localName}`);

    // Get sensor data
    const targetPin = MESH_100GP.Pin.P1;
    gpioBlock.setDigitalOutput({ p1: true, p2: false, p3: false });
  };

  await obniz.ble.scan.startWait();
};

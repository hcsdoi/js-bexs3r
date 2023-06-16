const MESH_100MD = Obniz.getPartsClass('MESH_100MD');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100MD.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const motionBlock = new MESH_100MD(peripheral);

    // Connect to the Button block
    await motionBlock.connectWait();
    console.log(`connected: ${motionBlock.peripheral.localName}`);

    // Get sensor data
    const motionState = await motionBlock.getSensorDataWait();
    switch (motionState) {
      case MESH_100MD.MotionState.DETECTED: {
        console.log('Detected!');
        break;
      }
      case MESH_100MD.MotionState.NOT_DETECTED: {
        console.log('Not Detected.');
        break;
      }
      default: {
        console.log('Starting up...');
        break;
      }
    }
  };

  await obniz.ble.scan.startWait();
};

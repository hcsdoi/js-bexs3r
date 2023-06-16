const MESH_100PA = Obniz.getPartsClass('MESH_100PA');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100PA.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const brightnessBlock = new MESH_100PA(peripheral);

    // Connect to the Button block
    await brightnessBlock.connectWait();
    console.log(`connected: ${brightnessBlock.peripheral.localName}`);

    // Get sensor data
    const res = await brightnessBlock.getSensorDataWait();
    console.log(
      'proximity: ' + res.proximity + ', brightness: ' + res.brightness
    );
  };

  await obniz.ble.scan.startWait();
};

const MESH_100TH = Obniz.getPartsClass('MESH_100TH');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100TH.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const temphumidBlock = new MESH_100TH(peripheral);

    // Connect to the Button block
    await temphumidBlock.connectWait();
    console.log(`connected: ${temphumidBlock.peripheral.localName}`);

    // Get sensor data
    const res = await temphumidBlock.getSensorDataWait();
    console.log(
      'temperature: ' + res.temperature + ', humidity: ' + res.humidity
    );
  };

  await obniz.ble.scan.startWait();
};

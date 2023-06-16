const MESH_100AC = Obniz.getPartsClass('MESH_100AC');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100AC.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const moveBlock = new MESH_100AC(peripheral);

    // Connect to the Button block
    await moveBlock.connectWait();
    console.log(`connected: ${moveBlock.peripheral.localName}`);

    // Tap Event
    moveBlock.onTapped = (accele) => {
      console.log(
        'tapped! (ax, ay, az) = (' +
          accele.x +
          ', ' +
          accele.y +
          ',' +
          accele.z +
          ')'
      );
    };

    // Shake Event
    moveBlock.onShaked = (accele) => {
      console.log(
        'shaked! (ax, ay, az) = (' +
          accele.x +
          ', ' +
          accele.y +
          ',' +
          accele.z +
          ')'
      );
    };

    // Flip Event
    moveBlock.onFlipped = (accele) => {
      console.log(
        'flipped! (ax, ay, az) = (' +
          accele.x +
          ', ' +
          accele.y +
          ',' +
          accele.z +
          ')'
      );
    };

    // Orientation Event
    moveBlock.onOrientationChanged = (orientation, accele) => {
      console.log(
        'orientation changed! ' +
          orientation +
          ', (ax, ay, az) = (' +
          accele.x +
          ', ' +
          accele.y +
          ',' +
          accele.z +
          ')'
      );
    };
  };

  await obniz.ble.scan.startWait();
};

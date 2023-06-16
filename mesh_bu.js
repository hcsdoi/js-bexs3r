const MESH_100BU = Obniz.getPartsClass('MESH_100BU');
obniz.onconnect = async function () {
  await obniz.ble.initWait();

  obniz.ble.scan.onfind = async function (peripheral) {
    if (!MESH_100BU.isMESHblock(peripheral)) {
      return;
    }
    console.log('found');

    // Create an instance
    const buttonBlock = new MESH_100BU(peripheral);

    // Connect to the Button block
    await buttonBlock.connectWait();
    console.log(`connected: ${buttonBlock.peripheral.localName}`);

    let count = 0;
    const GOAL = 10;

    // Single Pressed Event
    buttonBlock.onSinglePressed = () => {
      ++count;
      console.log('Single pressed, 1 count added; count = ' + count);
      if (count === GOAL) {
        console.log('YOU WIN !!');
      }
    };

    // Double Pressed Event
    buttonBlock.onDoublePressed = () => {
      count += 2;
      console.log('Double pressed, 2 counts added; count = ' + count);
      if (count === GOAL) {
        console.log('YOU WIN !!');
      }
    };

    // Long Pressed Event
    buttonBlock.onLongPressed = () => {
      count = 0;
      console.log('Long pressed, count has been reset; count = ' + count);
    };
  };

  await obniz.ble.scan.startWait();
};

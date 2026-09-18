function Appliance(name) {
  this.name = name;
  this.status = "off";
  this.isOn = false;
}

var TV = { name: "TV", status: "off", isOn: false };
var Lamp = { name: "Lamp", status: "off", isOn: false };
var Oven = { name: "Oven", status: "off", isOn: false };

function getAppliance(appliance) {
  if (typeof appliance === "string") {
    if (appliance === "TV") return TV;
    if (appliance === "Lamp") return Lamp;
    if (appliance === "Oven") return Oven;
    return { name: appliance, status: "off", isOn: false };
  }
  return appliance;
}

function turnOnAppliance(appliance) {
  var app = getAppliance(appliance);
  var name = app && app.name ? app.name : "Appliance";
  var result = "";
  try {
    if (app.status === "on" || app.isOn === true) {
      throw new Error(name + " is already on.");
    }
    app.status = "on";
    app.isOn = true;
    result = name + " is turned on.";
  } catch (error) {
    result = error.message;
  } finally {
    console.log("Operation completed.");
  }
  return result;
}

function turnOffAppliance(appliance) {
  var app = getAppliance(appliance);
  var name = app && app.name ? app.name : "Appliance";
  var result = "";
  try {
    if (app.status === "off" || app.isOn === false || (!app.status && !app.isOn)) {
      throw new Error(name + " is already off.");
    }
    app.status = "off";
    app.isOn = false;
    result = name + " is turned off.";
  } catch (error) {
    result = error.message;
  } finally {
    console.log("Operation completed.");
  }
  return result;
}

console.log(turnOnAppliance(TV));
console.log(turnOnAppliance(Lamp));
console.log(turnOnAppliance(Oven));
console.log(turnOffAppliance(TV));
console.log(turnOffAppliance(Lamp));
console.log(turnOffAppliance(Oven));
console.log(turnOffAppliance(TV));

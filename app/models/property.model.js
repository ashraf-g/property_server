const sql = require("../configs/dbConnect");

//Table constructor
const Property = function (property) {
  this.selectedOption = property.selectedOption;
  this.propertyType = property.propertyType;
  this.askingPrice = property.askingPrice;
  this.papersAvailable = property.papersAvailable;
  this.sqft = property.sqft;
  this.rooms = property.rooms;
  this.availableFrom = property.availableFrom;
  this.rentAmount = property.rentAmount;
  this.deposit = property.deposit;
  this.maintenance = property.maintenance;
  this.flatNo = property.flatNo;
  this.building = property.building;
  this.street = property.street;
  this.area = property.area;
  this.city = property.city;
  this.state = property.state;
  this.pincode = property.pincode;
  this.photo = property.photo;
  this.user_id = property.user_id;
};

// Create a new property
Property.create = (newProperty, result) => {
  sql.query("INSERT INTO property_info SET ?", newProperty, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created property: ", { id: res.insertId, ...newProperty });
    result(null, { id: res.insertId, ...newProperty });
  });
};

// Get all properties (optionally filtered by property type)
Property.getAll = (propertyType, result) => {
  let query = "SELECT * FROM property_info";

  if (propertyType) {
    query += ` WHERE propertyType LIKE '%${propertyType}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("properties: ", res);
    result(null, res);
  });
};

// Get properties by user ID
Property.getByUserId = (userId, result) => {
  let query = "SELECT * FROM property_info WHERE user_id = ?";

  sql.query(query, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("properties by user_id: ", res);
    result(null, res);
  });
};

// Get property by ID
Property.getById = (propertyId, result) => {
  let query = "SELECT * FROM property_info WHERE id = ?";

  sql.query(query, [propertyId], (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      // console.log("found property: ", res[0]);
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

// Update property by ID
Property.updateById = (id, property, result) => {
  let query =
    "UPDATE property_info SET selectedOption = ?, propertyType = ?, askingPrice = ?, papersAvailable = ?, sqft = ?, rooms = ?, availableFrom = ?, rentAmount = ?, deposit = ?, maintenance = ?, flatNo = ?, building = ?, street = ?, area = ?, city = ?, state = ?, pincode = ?, photo = ?, user_id = ? WHERE id = ?";

  sql.query(
    query,
    [
      property.selectedOption,
      property.propertyType,
      property.askingPrice,
      property.papersAvailable,
      property.sqft,
      property.rooms,
      property.availableFrom,
      property.rentAmount,
      property.deposit,
      property.maintenance,
      property.flatNo,
      property.building,
      property.street,
      property.area,
      property.city,
      property.state,
      property.pincode,
      property.photo,
      property.user_id,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated property: ", { id: id, ...property });
      result(null, { id: id, ...property });
    }
  );
};

// Delete property by ID
Property.deleteById = (id, result) => {
  let query = "DELETE FROM property_info WHERE id = ?";

  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted property with id: ", id);
    result(null, res);
  });
};

// Remove all properties
Property.removeAll = (result) => {
  let query = "DELETE FROM property_info";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("removed all properties");
    result(null, res);
  });
};

module.exports = Property;

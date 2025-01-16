const Property = require("../models/property.model");
const path = require("path");

// Create a new property
exports.create = (req, res) => {
  // console.log(req.body);

  // Validate if file is uploaded
  if (!req.file) {
    return res.status(400).send({
      message: "Property image is required!",
    });
  }

  // Create a new property object from the request body
  const newProperty = new Property({
    selectedOption: req.body.selectedOption,
    propertyType: req.body.propertyType,
    askingPrice: req.body.askingPrice,
    papersAvailable: req.body.papersAvailable,
    sqft: req.body.sqft,
    rooms: req.body.rooms,
    availableFrom: req.body.availableFrom,
    rentAmount: req.body.rentAmount,
    deposit: req.body.deposit,
    maintenance: req.body.maintenance,
    flatNo: req.body.flatNo,
    building: req.body.building,
    street: req.body.street,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    // photo: req.file.path,
    photo: `uploads/${path.basename(req.file.path)}`,
    user_id: req.body.user_id,
  });

  // Call model's create method
  Property.create(newProperty, (err, property) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the property.",
      });
    }
    res.status(201).send({
      message: "Property created successfully",
      property: property,
    });
  });
};

// Get all properties
exports.getAll = (req, res) => {
  const propertyType = req.query.propertyType;

  Property.getAll(propertyType, (err, properties) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving properties.",
      });
    }
    if (properties && Array.isArray(properties)) {
      properties = properties.map((property) => {
        let imageUrl = null;
        if (property.photo) {
          imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/${path.basename(property.photo)}`;
        }
        return {
          ...property,
          photoUrl: imageUrl,
        };
      });
    }

    res.status(200).send({
      properties,
    });
  });
};

// Get properties by user ID
exports.getByUserId = (req, res) => {
  const userId = req.params.user_id;

  Property.getByUserId(userId, (err, properties) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Properties not found for user with id ${userId}`,
        });
      }
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving properties for the user.",
      });
    }

    let imageUrl = null;
    if (properties && Array.isArray(properties)) {
      properties = properties.map((property) => {
        if (property.photo) {
          imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/${path.basename(property.photo)}`;
        }
        return {
          ...property,
          photoUrl: imageUrl,
        };
      });
    }
    res.status(200).send({
      properties: {
        ...properties,
        // photoUrl: imageUrl,
      },
    });
  });
};

exports.getById = (req, res) => {
  const propertyId = req.params.id;

  Property.getById(propertyId, (err, property) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Property with id ${propertyId} not found`,
        });
      }
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the property.",
      });
    }

    console.log(property);

    let imageUrl = null;

    if (property && property.photo) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(
        property.photo
      )}`;
    }

    res.status(200).send({
      property: {
        ...property,
        // photoUrl: imageUrl,
      },
    });
  });
};

// Update property by ID
exports.updateById = (req, res) => {
  const propertyId = req.params.id;

  // Validate request body
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Validate if file is uploaded
  if (!req.file) {
    return res.status(400).send({
      message: "Property image is required!",
    });
  }

  const updatedProperty = new Property({
    selectedOption: req.body.selectedOption,
    propertyType: req.body.propertyType,
    askingPrice: req.body.askingPrice,
    papersAvailable: req.body.papersAvailable,
    sqft: req.body.sqft,
    rooms: req.body.rooms,
    availableFrom: req.body.availableFrom,
    rentAmount: req.body.rentAmount,
    deposit: req.body.deposit,
    maintenance: req.body.maintenance,
    flatNo: req.body.flatNo,
    building: req.body.building,
    street: req.body.street,
    area: req.body.area,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    // photo: req.file.path,
    photo: `uploads/${path.basename(req.file.path)}`,
    user_id: req.body.user_id,
  });

  Property.updateById(propertyId, updatedProperty, (err, property) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Property with id ${propertyId} not found`,
        });
      }
      return res.status(500).send({
        message:
          err.message || "Some error occurred while updating the property.",
      });
    }
    if (property && Array.isArray(property)) {
      property = property.map((property) => {
        let imageUrl = null;
        if (property.photo) {
          imageUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/${path.basename(property.photo)}`;
        }
        return {
          ...property,
          photoUrl: imageUrl,
        };
      });
    }
    res.status(200).send({
      message: "Property updated successfully",
      property: property,
    });
  });
};

// Delete property by ID
exports.deleteById = (req, res) => {
  const propertyId = req.params.id;

  Property.deleteById(propertyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Property with id ${propertyId} not found`,
        });
      }
      return res.status(500).send({
        message:
          err.message || "Some error occurred while deleting the property.",
      });
    }
    res.status(200).send({
      message: "Property deleted successfully",
    });
  });
};

// Remove all properties
exports.removeAll = (req, res) => {
  Property.removeAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all properties.",
      });
    }
    res.status(200).send({
      message: "All properties removed successfully",
    });
  });
};

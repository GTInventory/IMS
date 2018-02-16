const BASE_URL = "https://ims-backend.mybluemix.net"

function getRequest(url) {
    return fetch(url, {
            method: 'GET',
            });
}

function postRequest(url, body) {
    return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
            "Content-Type": "application/json"
            }
        });
}

module.exports = {
    createAttribute: function(name, type, visible, callback) {
        let url = BASE_URL + "/attribute";

        let data = {
            "name": name,
            "type": type,
            "public": visible
        }

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getAttributeByName: function(name, callback) {
        let url = BASE_URL + "/attribute?q=" + name;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getAttributeById: function(attributeId, callback) {
        let url = BASE_URL + "/attribute/" + attributeId;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getAttributeAll: function(callback) {
        let url = BASE_URL + "/attribute/"

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateAttribute: function(attributeId, name, type, isPublic, callback) {
        let url = BASE_URL + "/attribute/" + attributeId;

        let data = {}

        if (name) {
            data["name"] = name;
        }

        if (type) {
            data["type"] = type;
        }

        if (isPublic) {
            data["public"] = isPublic;
        }

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getEquipmentTypeAll: function(callback) {
        let url = BASE_URL + "/type";

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getEquipmentTypeById: function(equipmentTypeId, callback) {
        let url = BASE_URL + "/type/" + equipmentTypeId;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    createEquipmentType: function(name, nameAttribute, available, callback) {
        let url = BASE_URL + "/type";

        let data = {
            "name": name,
            "nameAttribute": nameAttribute,
            "available": available
        }

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateEquipmentType: function(equipmentTypeId, name, nameAttribute, available, callback) {
        let url = BASE_URL + "/type/" + equipmentTypeId;

        let data = {
            "name": name,
            "nameAttribute": nameAttribute,
            "available": available
        }

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getEquipmentById: function(equipmentId, callback) {
        let url = BASE_URL + "/item/" + equipmentId;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getEquipmentAll: function(callback) {
        let url = BASE_URL + "/item";

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateEquipment: function(equipmentId, data, callback) {
        let url = BASE_URL + "/item/" + equipmentId;

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    createEquipment: function(data, callback) {
        let url = BASE_URL + "/item";

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    }
}

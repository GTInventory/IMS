const BASE_URL = "https://ims-backend.mybluemix.net";

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

    getEquipmentTypeAll: function(start, limit, callback) {
        let url = BASE_URL + "/type" + "?start=" + start + "&limit=" + limit;

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

    searchEquipmentTypesByName: function(searchString, callback) {
        let url = BASE_URL + "/type/?q=" + searchString;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    addAttributeToType: function(equipmentTypeId, attributeId, attributeUnique, attributeRequired, callback) {
        let url = BASE_URL + "/type/" + equipmentTypeId + "/attribute";

        let data = {
            "attribute": {
                "id": attributeId,
                "uniqueForType": attributeUnique,
                "required": attributeRequired
            }
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateEquipmentTypeById: function(equipmentTypeId, name, nameAttribute, callback) {
        let url = BASE_URL + "/type/" + equipmentTypeId;

        let data = {
            "name": name,
            "nameAttribute": nameAttribute
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    createEquipmentType: function(name, attributeList, nameAttribute, callback) {
        let url = BASE_URL + "/type";

        let data = {
            "name": name,
            "attributes": attributeList,
            "nameAttribute": nameAttribute
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    deleteEquipmentType: function(equipmentTypeId) {
        let url = BASE_URL + "/type/" + equipmentTypeId + "/delete";

        postRequest(url)
            .catch(error => callback(error))
            .then(response =>(null, response));
    },

    getAttributeById: function(attributeId, callback) {
        let url = BASE_URL + "/attribute/" + attributeId;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    getAttributeAll: function(start, limit, callback) {
        let url = BASE_URL + "/attribute" + "?start=" + start + "&limit=" + limit;

        getRequest(url)
            .then(res => res.json())
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

    createAttribute: function(name, type, isPublic, unique, regex, helpText, callback) {
        let url = BASE_URL + "/attribute";

        let data = {
            "name": name,
            "type": type,
            "public": isPublic,
            "uniqueGlobally": unique,
            "regex": regex,
            "helpText": helpText
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateAttribute: function(attributeId, name, type, isPublic, unique, regex, helpText, callback) {
        let url = BASE_URL + "/attribute/" + attributeId;

        let data = {
            "name": name,
            "type": type,
            "public": isPublic,
            "uniqueGlobally": unique,
            "regex": regex,
            "helpText": helpText
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    deleteAttribute: function(attributeId) {
        let url = BASE_URL + "/attribute/" + attributeId + "/delete";

        postRequest(url)
            .catch(error => callback(error))
            .then(response =>(null, response));
    },

    getEquipmentAll: function(start, limit, callback) {
        let url = BASE_URL + "/item" + "?start=" + start + "&limit=" + limit;

        getRequest(url)
            .then(res => res.json())
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

    searchEquipmentByName: function(searchString, start, limit, callback) {
        let url = BASE_URL + "/item?q=" + searchString  + "&start=" + start + "&limit=" + limit;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    searchEquipmentByType: function(typeId, searchString, start, limit, callback) {
        let url = BASE_URL + "/item?q=" + searchString  + "&start=" + start + "&limit=" + limit + "&typeId=" + typeId;

        getRequest(url)
            .then(res => res.json())
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    updateEquipment: function(equipmentId, typeId, attributeList, callback) {
        let url = BASE_URL + "/item/" + equipmentId;

        let data = {
            "typeId": typeId,
            "attributes": attributeList
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    createEquipment: function(typeId, attributeList, callback) {
        let url = BASE_URL + "/item";

        let data = {
            "typeId": typeId,
            "attributes": attributeList
        };

        postRequest(url, data)
            .catch(error => callback(error))
            .then(response => callback(null, response));
    },

    deleteEquipment: function(equipmentId) {
        let url = BASE_URL + "/item/" + equipmentId + "/delete";

        postRequest(url)
            .catch(error => callback(error))
            .then(response =>(null, response));
    }
};
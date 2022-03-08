$(() => {
    $("#register").click(() => {
        const ssn = $("#ssn");
        const name = $("#name");
        const address = $("#address");
        const characteristics = $("#characteristics");
        const brand = $("#brand");
        const type = $("#type");

        const vehicle = {
            ssn: ssn.val(),
            name: name.val(),
            address: address.val(),
            characteristics: characteristics.val(),
            brand: brand.val(),
            type: type.val()
        }

        if (inputval(vehicle)) {
            $.post("/api", vehicle, () => fetchVehicles())

            ssn.val("")
            name.val("")
            address.val("")
            characteristics.val("")
            brand.val("")
            type.val("")
        } else {
            console.log("Wrong input")
        }
    })

    $("#deleteAll").click(() => {
        $.ajax("/api", {
            type: "DELETE",
            success: () => fetchVehicles(),
            error: (jqXhr, textStatus, errorMessage) => console.log(errorMessage)
        })
    });

    fetchVehicles();
})

const fetchVehicles = () => $.get("/api", list => {
    formatBrandInput(list);
    formatList(list);
})

const formatList = list => {
    let msg = "";

    if (list.length > 0) {
        msg += "<table class='table table-striped'><tr><th>Personnr</th><th>Navn</th><th>Adresse</th><th>Kjennetegn</th><th>Merke</th><th>Type</th></tr>"

        for (let vehicle of list) {
            msg += "<tr><td>" + vehicle.ssn + "</td><td>" + vehicle.name + "</td><td>" + vehicle.address + "</td>" +
                "<td>" + vehicle.characteristics + "</td><td>" + vehicle.brand + "</td><td>" + vehicle.type + "</td></tr>"
        }

        msg += "</table>";
    }

    $("#list").html(msg)
}

const formatBrandInput = list => {
    let out = "<select class='form-control' id='chosenCar' onchange='getTypes()'>";
    let lastBrand = "";

    out += "<option value='' disabled selected>Choose Brand</option>"

    for (const vehicle of list) {
        if (vehicle.brand !== lastBrand) {
            out += "<option>" + vehicle.brand + "</option>";
        }
        lastBrand = vehicle.brand;
    }

    out += "</select>";

    $("#brand").html(out);
}

const inputval = vehicle => {
    if (vehicle.ssn === "") return false
    else if (vehicle.name === "") return false
    else if (vehicle.address === "") return false
    else if (vehicle.characteristics === "") return false
    else if (vehicle.brand === "") return false
    else return vehicle.type !== "";
}
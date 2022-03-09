$(() => {
    $("#register").click(() => {
        const ssn = $("#ssn");
        const name = $("#name");
        const address = $("#address");
        const characteristics = $("#characteristics");
        const brand = $("#chosenBrand");
        const type = $("#chosenType");

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
            formatBrandInput();
            resetTypeInput();

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

    //so that we get our dropdown
    formatBrandInput()

    // so that we get type input
    resetTypeInput();

    // so that the table loads on reload
    fetchVehicles();
})

const fetchVehicles = () => $.get("/api/getVehicles", list => {
    formatVehicleTable(list);
})

const formatVehicleTable = list => {
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

const formatBrandInput = () => $.get("/api/getCars", list => {
    // let msg = "<select class='form-control' id='chosenBrand' onchange='formatTypeInput()'>";
    let msg = "<select class='form-control' id='chosenBrand'>";

    let lastBrand = "";

    msg += "<option value='' selected hidden disabled>Velg Merke</option>"

    for (const car of list) {
        if (car.brand !== lastBrand) {
            msg += "<option>" + car.brand + "</option>";
        }
        lastBrand = car.brand;
    }

    msg += "</select>";

    $("#brand").html(msg);

    $("#chosenBrand").on("change", formatTypeInput);
})

const formatTypeInput = () => $.get("/api/getCars", list => {
    let msg = "<select class='form-control' id='chosenType'>";

    const currentBrand = $("#chosenBrand").val();

    msg += "<option value='' selected hidden disabled>Velg Type</option>"

    for (const car of list) {
        console.log(car.brand + " " + currentBrand)
        if (car.brand === currentBrand) {
            msg += "<option>" + car.type + "</option>";
        }
    }

    msg += "</select>";

    $("#type").html(msg);
})

const resetTypeInput = () => {
    const msg = "" +
        "<select disabled name=\"\" id=\"\" class=\"form-control\">\n" +
            "<option disabled selected value=\"\">Velg merke for å velge type</option>\n" +
        "</select>"

    $("#type").html(msg);

}

const inputval = vehicle => {
    if (vehicle.ssn === "") return false
    else if (vehicle.name === "") return false
    else if (vehicle.address === "") return false
    else if (vehicle.characteristics === "") return false
    else if (vehicle.brand === "") return false
    else return vehicle.type !== "" && vehicle.type != null;
}
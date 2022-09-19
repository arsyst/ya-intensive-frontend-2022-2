"use strict";

class EarthRoute {
    static vault = []
    transfer(parcel) {
        parcel.destination = 'Earth';
        EarthRoute.vault.push(parcel);
    }
}

class MoonRoute {
    static warehouse = []
    transfer(parcel) {
        parcel.destination = 'Moon';
        MoonRoute.warehouse.push(parcel);
    }
}


function extendTransportSystem(EarthRoute, MoonRoute) {
    let mothershipVault = []

    function duplicateParcelToMothership(parcel) {
        let mothershipParcel = {};
        Object.assign(mothershipParcel, parcel);
        mothershipParcel.origin = mothershipParcel.destination;
        mothershipParcel.destination = "Mothership";
        mothershipVault.push(mothershipParcel);
    }

    EarthRoute.prototype.transfer = function(parcel) {
        parcel.destination = 'Earth';
        EarthRoute.vault.push(parcel);
        duplicateParcelToMothership(parcel);
    };
    MoonRoute.prototype.transfer = function(parcel) {
        parcel.destination = 'Moon';
        MoonRoute.warehouse.push(parcel);
        duplicateParcelToMothership(parcel);
    };

    return mothershipVault;
}

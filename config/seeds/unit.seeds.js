const Unit = require("../../models/Unit.model");

const units = [{ name: "kg" }, { name: "g" }, { name: "L" }, { name: "mL" }];

const seedUnits = async () => {
    try {
        if (Unit.count() > 0) {
            console.log("Units already seeded, nothing to do here");
            return;
        }

        const createdUnits = await Unit.create(units);
        console.log(`Created ${createdUnits.length} units`);
        createdUnits.forEach((entry) => console.log(entry));
    } catch (error) {
        console.error(
            `something went wrong while seeding Units: ${error.message}`
        );
    }
};

module.exports = seedUnits;

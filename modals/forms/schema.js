const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema(
    {
        _id: String,
        brandId: { type: String, ref: "users" },
        mode: { type: Number, required: true },
        name: { type: String, required: true },
        fields: [{
            label: { type: String, required: true },
            name: { type: String, required: true },
            required: { type: Boolean, required: true },
            type: {
                type: String,
                required: true,
                enum: [
                    "checkbox",
                    "date",
                    "email",
                    "file",
                    "number",
                    "password",
                    "radio",
                    "range",
                    "reset",
                    "text",
                ],
            },
            option: { type: Array },
        }],
        onSubmit: { type: String, required: true },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date },
        createdAt: {
            type: Number
        },
        updatedAt: {
            type: Number
        }
    },
    {
        versionKey: false,
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: { currentTime: () => Date.now() }
    }
);

FormSchema.path("fields").validate((fields) => {
    console.log("validate", fields);
    if (!fields) {
        return false;
    } else if (fields.length === 0) {
        return false;
    }
    return true;
}, "Fields needs to have at least one feature");


module.exports = FormSchema;




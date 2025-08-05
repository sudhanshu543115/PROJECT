const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false // Don't include password in queries by default
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: {
            type: String,
            default: 'USA'
        }
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String
    },
    medicalProfile: {
        bloodType: {
            type: String,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
            default: 'Unknown'
        },
        allergies: [{
            name: String,
            severity: {
                type: String,
                enum: ['Mild', 'Moderate', 'Severe'],
                default: 'Mild'
            },
            notes: String
        }],
        medications: [{
            name: String,
            dosage: String,
            frequency: String,
            startDate: Date,
            endDate: Date,
            prescribedBy: String,
            notes: String
        }],
        conditions: [{
            name: String,
            diagnosedDate: Date,
            status: {
                type: String,
                enum: ['Active', 'Inactive', 'Resolved'],
                default: 'Active'
            },
            notes: String
        }]
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


userSchema.index({ email: 1 });
userSchema.index({ 'medicalProfile.bloodType': 1 });

userSchema.pre('save', async function(next) {
    
    if (!this.isModified('password')) return next();

    try {
    
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema); 
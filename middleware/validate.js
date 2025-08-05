const { body, validationResult } = require('express-validator');


const registerValidation = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    
    body('dateOfBirth')
        .isISO8601()
        .withMessage('Please enter a valid date of birth')
        .custom((value) => {
            const age = Math.floor((new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 0 || age > 120) {
                throw new Error('Please enter a valid date of birth');
            }
            return true;
        }),
    
    body('phoneNumber')
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid phone number'),
    
    body('address.street')
        .optional()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Street address must be between 5 and 100 characters'),
    
    body('address.city')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('City must be between 2 and 50 characters'),
    
    body('address.state')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('State must be between 2 and 50 characters'),
    
    body('address.zipCode')
        .optional()
        .matches(/^\d{5}(-\d{4})?$/)
        .withMessage('Please enter a valid ZIP code'),
    
    body('emergencyContact.name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Emergency contact name must be between 2 and 100 characters'),
    
    body('emergencyContact.phoneNumber')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid emergency contact phone number'),
    
    body('medicalProfile.bloodType')
        .optional()
        .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'])
        .withMessage('Please enter a valid blood type'),
    
    body('medicalProfile.allergies.*.name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Allergy name must be between 2 and 100 characters'),
    
    body('medicalProfile.allergies.*.severity')
        .optional()
        .isIn(['Mild', 'Moderate', 'Severe'])
        .withMessage('Allergy severity must be Mild, Moderate, or Severe'),
    
    body('medicalProfile.medications.*.name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Medication name must be between 2 and 100 characters'),
    
    body('medicalProfile.medications.*.dosage')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Medication dosage must be between 1 and 50 characters'),
    
    body('medicalProfile.conditions.*.name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Condition name must be between 2 and 100 characters'),
    
    body('medicalProfile.conditions.*.status')
        .optional()
        .isIn(['Active', 'Inactive', 'Resolved'])
        .withMessage('Condition status must be Active, Inactive, or Resolved')
];

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const updateProfileValidation = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),
    
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),
    
    body('phoneNumber')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid phone number'),
    
    body('address.street')
        .optional()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Street address must be between 5 and 100 characters'),
    
    body('address.city')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('City must be between 2 and 50 characters'),
    
    body('address.state')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('State must be between 2 and 50 characters'),
    
    body('address.zipCode')
        .optional()
        .matches(/^\d{5}(-\d{4})?$/)
        .withMessage('Please enter a valid ZIP code'),
    
    body('emergencyContact.name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Emergency contact name must be between 2 and 100 characters'),
    
    body('emergencyContact.phoneNumber')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid emergency contact phone number')
];


const changePasswordValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    changePasswordValidation,
    handleValidationErrors
}; 
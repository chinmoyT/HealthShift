const {USER_ROLES, MODULES} = require('../utility/constants');

function setPermissions(userRole) {
    const permissions = {
        [MODULES.LEAVES_MANAGEMENT]: {
            canView: false,
            canEdit: false,
            canDelete: false
        },
        [MODULES.DEPARTMENT]: {
            canView: false,
            canEdit: false,
            canDelete: false
        },
        [MODULES.STAFF_MANAGEMENT]: {
            canView: false,
            canEdit: false,
            canDelete: false
        },
        [MODULES.USER_MANAGEMENT]: {
            canView: false,
            canEdit: false,
            canDelete: false
        },
        [MODULES.ANALYTICS]: {
            canView: false,
            canEdit: false,
            canDelete: false
        }
    };

    switch (userRole) {
        case USER_ROLES.ADMIN:
            permissions[MODULES.LEAVES_MANAGEMENT].canView = true;
            permissions[MODULES.LEAVES_MANAGEMENT].canEdit = true;
            permissions[MODULES.LEAVES_MANAGEMENT].canDelete = true;
            permissions[MODULES.DEPARTMENT].canView = true;
            permissions[MODULES.DEPARTMENT].canEdit = true;
            permissions[MODULES.DEPARTMENT].canDelete = true;
            permissions[MODULES.STAFF_MANAGEMENT].canView = true;
            permissions[MODULES.STAFF_MANAGEMENT].canEdit = true;
            permissions[MODULES.STAFF_MANAGEMENT].canDelete = true;
            permissions[MODULES.USER_MANAGEMENT].canAdd = true;
            permissions[MODULES.USER_MANAGEMENT].canView = true;
            permissions[MODULES.USER_MANAGEMENT].canEdit = true;
            permissions[MODULES.USER_MANAGEMENT].canDelete = true;
            permissions[MODULES.ANALYTICS].canView = true;
            permissions[MODULES.ANALYTICS].canEdit = true;
            permissions[MODULES.ANALYTICS].canDelete = true;
            break;

        case USER_ROLES.MANAGER:
            permissions[MODULES.LEAVES_MANAGEMENT].canView = true;
            permissions[MODULES.LEAVES_MANAGEMENT].canEdit = true;
            permissions[MODULES.DEPARTMENT].canView = true;
            permissions[MODULES.DEPARTMENT].canEdit = true;
            permissions[MODULES.STAFF_MANAGEMENT].canView = true;
            permissions[MODULES.STAFF_MANAGEMENT].canEdit = true;
            break;

        case USER_ROLES.STAFF:
            permissions[MODULES.LEAVES_MANAGEMENT].canView = true;
            permissions[MODULES.LEAVES_MANAGEMENT].canEdit = true;
            break;

        default:
            break;
    }

    return permissions;
}

module.exports = setPermissions;
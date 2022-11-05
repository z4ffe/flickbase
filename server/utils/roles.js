const AccessControl = require('accesscontrol')

allRights = {
   'create:any': ['*'],
   'read:any': ['*'],
   'update:any': ['*'],
   'delete:any': ['*']
}

let grantsObject = {
   admin: {
	  profile: allRights
   },
   user: {
	  profile: {
		 'read:own': ['*', '!password', '!_id'],
		 'update:own': ['*', '!password', '!_id']
	  }
   }
}

const roles = new AccessControl(grantsObject)

module.exports = {roles}

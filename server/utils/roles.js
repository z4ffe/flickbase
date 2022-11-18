const AccessControl = require('accesscontrol')

allRights = {
   'create:any': ['*'],
   'read:any': ['*'],
   'update:any': ['*'],
   'delete:any': ['*']
}

let grantsObject = {
   admin: {
	  profile: allRights,
	  articles: allRights
   },
   user: {
	  profile: {
		 'read:own': ['*', '!password', '!_id'],
		 'update:own': ['*', '!password', '!_id']
	  },
	  articles: {
		 'read:any': ['*']
	  }
   }
}

const roles = new AccessControl(grantsObject)

module.exports = {roles}

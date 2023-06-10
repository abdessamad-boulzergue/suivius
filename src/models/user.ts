import UserDao from "../database/dao/UserDao";
import { User ,SuiviePermission,UserPermission} from "../database/types";
import { useDao } from '../stores/context';
const ROLES ={
    admin:"admin",
    edition:"edition",
    validation:"validation",
    consultation:"consultation",
}

export default class UserManager{

    private permissions!:Array<SuiviePermission>

    constructor(private user:User){
        this.permissions = [];
    }

    setPermissions(permissions:Array<SuiviePermission>){
        this.permissions = permissions;
    }
}
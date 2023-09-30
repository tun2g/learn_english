export class RoleAuth{
    static ADMIN = 'admin';
    static USER = 'user';
}

export class RoleToken {
    static ACCESS_TOKEN = 'access_token';
    static REFRESH_TOKEN = 'refresh_token';
}

export class RoleExpiredTimeToken{
    static ACCESS_TOKEN = 60*30;
    static REFRESH_TOKEN = 60*60*24;
}
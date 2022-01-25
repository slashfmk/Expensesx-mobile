
export default interface IAuth {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
    status: boolean;
    token: string | undefined;
}

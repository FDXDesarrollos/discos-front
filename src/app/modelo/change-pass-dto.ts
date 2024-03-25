export class ChangePassDTO {
    private password: string = '';
    private confirmPassword: string = '';
    private tokenPassword: string = '';

    consructor(password: string, confirmPassword: string, tokenPassword: string){
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.tokenPassword = tokenPassword;
    }
}

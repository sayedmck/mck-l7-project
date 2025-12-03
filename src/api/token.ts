import { APIResponse, request, expect } from "@playwright/test";


let response: APIResponse;

export class Token{

    public async generateToken(){
        const context= await request.newContext();
        response= await context.post("https://practice.expandtesting.com/notes/api/users/login",{
            data:{
                "email": "mckasayed@gmail.com",
                "password": "sayed123"
            }
        });
        
        return await response.json().then((details)=>{
            // expect(details.status).toBe(HttpStatusCode.OK);
            expect(details.success).toEqual(true);
            expect(details.message).toMatch("Login successful");

            return details.data.token;
        });
    }
}
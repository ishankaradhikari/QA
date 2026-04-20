import axios from 'axios';
import {expect} from '@playwright/test';

let apiUrl

async function authenticateUser(username, password, {request}){
    const apiUrl = await getApiBaseUrl();
    const headers ={
        "Content-Type": "application/json"
    };
    const requestBody = {
        email:username,
        password:password,
    };
    const response = await request.post(`${apiUrl}/users/login`,{
        data: requestBody,
        headers,
    });
    
    const statusCode = response.status();
    if(statusCode !== 200){
        const errorBody = await response.json();
        console.error("Login failed with status:", statusCode);
        console.error("Response:", errorBody);
        throw new Error(`Login failed: ${statusCode} - ${JSON.stringify(errorBody)}`);
    }
    
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}

async function getApiBaseUrl(){
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl){
        apiUrl = "http://thinking-tester-contact-list.herokuapp.com";
    }
    return apiUrl;
}

async function createEntity(userData, accessToken, module, {request}){
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
    };

    const response = await request.post(apiUrl + module, {
        headers,
        data: JSON.stringify(userData),
    });

    const statusCode = response.status();
    expect(statusCode).toBe(201);
    const responseBody = await response.json();
    console.log('Create response:', JSON.stringify(responseBody));
    if(responseBody && responseBody._id){
        return responseBody._id;
    } else{
        console.log('No ID found in response:', responseBody);
        return null;
    }
}

async function deleteEntity(accessToken, module, {request}){
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authorization": `Bearer ${accessToken}`,
    };
    
    const response = await request.delete(apiUrl + module, {
        headers,
    });
    const statusCode = response.status();
    console.log('Delete response status:', statusCode, 'for URL:', apiUrl + module);
    if(statusCode !== 200){
        try{
            const errorBody = await response.json();
            console.error('Delete failed. Response:', JSON.stringify(errorBody));
        } catch(e){
            const errorText = await response.text();
            console.error('Delete failed. Response:', errorText);
        }
    }
    expect(statusCode).toBe(200);
}

async function validateEntity(accessToken, module, status, {request}){
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    };
    const response = await request.get(apiUrl + module, {
        headers,
    });

    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
}

async function getEntity(accessToken, module, status, {request}){
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    };
    const response = await request.get(apiUrl + module, {
        headers,
    });

    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
    const responseBody = await response.json();
    if (responseBody && responseBody[0] && responseBody[0]._id){
        return responseBody[0]._id;
    } else{
        return null;
    }
}

export {authenticateUser, createEntity, deleteEntity, validateEntity, getEntity};
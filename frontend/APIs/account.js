import { BASE_URL } from "./init.js";
import axios from 'axios';

const API_URL = BASE_URL + '/account';

// Lấy tất cả account theo email và createdAt
export const getAllAccountByEmail = async (username, roleId) => {
    try {
        const response = await axios.get(`${API_URL}/find-account-by-email`, {
            params: {
                username: username,
                roleId: roleId
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
        console.log(error.response);
        return [];
    }
};

// Lấy account theo id
export const getAccountById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
        console.log(error.response);
        return null;
    }
};

// Tạo account mới
export const createAccount = async (account) => {
    try {
        const response = await axios.post(API_URL, account, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
        console.log(error.response);
        return [];
    }
};

// Cập nhật account theo id
export const updateAccount = async (id, account) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, account, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
        console.log(error.response);
        return null;
    }
};

// Xóa account theo id
export const deleteAccount = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
        console.log(error.response);
        return null;
    }
};

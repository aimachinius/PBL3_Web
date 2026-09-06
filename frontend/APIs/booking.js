import { BASE_URL } from "./init.js";
import axios from 'axios';

const API_URL = BASE_URL + '/bookings';

// Tạo booking mới
export const createBooking = async (bookingRequest) => {
    try {
        const response = await axios.post(API_URL, bookingRequest, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.log("loi roi ban oi");
        throw error;
    }
};

// Lấy booking theo id
export const getBookingById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return null;
    }
};

// Xóa booking theo id
export const deleteBooking = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return null;
    }
};

// Lấy danh sách booking theo customerId
export const findByCustomerId = async (customerId) => {
    try {
        const response = await axios.get(`${API_URL}/findByCustomerId/${customerId}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return [];
    }
};

// Lấy danh sách booking theo khoảng thời gian
export const findByFromDate = async (fromDate, toDate) => {
    try {
        const response = await axios.get(`${API_URL}/fromDate/${fromDate}/toDate/${toDate}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return [];
    }
};

// Lấy danh sách vé theo bookingId
export const getTicketsByBookingId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/tickets`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Tìm danh sách booking theo thông tin khách hàng
export const findByCustomerInformation = async (email, phone, cardNumber) => {
    try {
        const params = new URLSearchParams();
        if (email) params.append('email', email);
        if (phone) params.append('phone', phone); 
        if (cardNumber) params.append('cardNumber', cardNumber);

        const response = await axios.get(`${API_URL}/findByCustomerInformation?${params.toString()}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        return [];
    }
};

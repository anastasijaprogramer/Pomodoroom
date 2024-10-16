import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to load the image URL from local storage
const loadImageFromLocalStorage = () =>
{
    return localStorage.getItem('bgImage') || '';
};

export const fetchImage = createAsyncThunk(
    'image/fetchImage',
    async (index = 0) =>
    {
        const response = await fetch(`https://bing.biturl.top/?resolution=UHD&format=json&index=${index}&mkt=en-US`);
        const data = await response.json();
        return data.url; // Extracting the image URL from the response
    }
)


const imageSlice = createSlice({
    name: 'image',
    initialState: {
        url: loadImageFromLocalStorage(), // Initialize from local storage
        loading: false,
        error: null,
        copyright: ""
    },
    reducers: {
        // Action to set image URL in state and save to local storage
        setImage: (state, action) =>
        {
            state.url = action.payload;
            localStorage.setItem('bgImage', action.payload); // Save to local storage
        },
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchImage.pending, (state) =>
            {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchImage.fulfilled, (state, action) =>
            {
                state.isLoading = false;
                state.url = action.payload;
                localStorage.setItem('bgImage', action.payload); // Save to local storage
            })
            .addCase(fetchImage.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.error = action.error.message;
            })


    }
})

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer
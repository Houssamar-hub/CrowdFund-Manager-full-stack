import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../../services/projectService";

const initialState = {
  projects: [],
  selectedProject: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getMyProjects = createAsyncThunk(
  "projects/getMy",
  async (_, thunkAPI) => {
    try {
      return await projectService.getMyProjects();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, thunkAPI) => {
    try {
      return await projectService.createProject(projectData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "projects/getById",
  async (id, thunkAPI) => {
    try {
      return await projectService.getProjectById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, projectData }, thunkAPI) => {
    try {
      return await projectService.updateProject(id, projectData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, thunkAPI) => {
    try {
      await projectService.deleteProject(id);
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeProject = createAsyncThunk(
  "projects/close",
  async (id, thunkAPI) => {
    try {
      return await projectService.closeProject(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedProject = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.selectedProject = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
        state.selectedProject = action.payload;
      })
      .addCase(closeProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;

import { createStore } from 'vuex'
import axiosClient from '../axios/axios'
import itechObject from '../js/itech-objects'
import itechAPI from '../js/itech-api'
const userModule = {
    state: () => ({
        data: {},
        token: sessionStorage.getItem("TOKEN"),
        emailVerified: false
    }),
    actions: {
        async login({ commit }, data) {
            return axiosClient.post('/auth/login', data).then(({ data }) => {
                if (data.ok) commit('storeLoginData', data)
                return data;
            }).catch((err) => {
                return { ok: false, error: err.response.data.message }
            })
        }
    },
    mutations: {
        storeLoginData: (state, data) => {
            state.data = data
            state.token = data.data.accessToken
            sessionStorage.setItem("TOKEN", data.data.accessToken)
        }
    }
}
const servicesModule = {
    state: () => ({
        type: '',
        data: {},
    }),
    actions: {
        addService({ commit }, service = { data: '', type: '' }) {
            if (service) commit('storeService', service)
        }
    },
    mutations: {
        storeService: (state, service) => {
            state.data = service.data
            state.type = service.type
        }
    }
}
const projectModule = {
    state: () => ({
        data: {}
    }),
    actions: {
        async createProject({ commit }, payload) {
            return axiosClient.post('/project', payload).then(({ data }) => {
                console.log(data)
                if (data.ok) commit('storeProject', data.data)
                return data
            }).catch((err) => {
                return err.response.data
            })
        },
        async getSpreadsheetProjects({ commit }) {
            return axiosClient.get('/project').then(({ data }) => {
                if (data.ok) commit('putProject', data.data)
                return data
            }).catch((err) => {
                return { ok: false, error: err }
            })
        },

    },
    mutations: {
        storeProject: (state, data) => {
            console.log("ss" + data)
            for (let key in state.data) {
                for (let d of state.data[key]) {
                    delete d.active
                }
            }
            state.data[data.serviceType].push(Object.assign(data, { active: true }))
        },
        putProject: (state, data) => {
            console.log(data)
            state.data = data
        }
    }
}

const spreadsheetModule = {
    state: () => ({
        data: [],
        sheets: {
            id: '',
            data: []
        }
    }),
    actions: {
        async getSpreadsheets({ commit }, id) {
            return axiosClient.get(`/spreadsheet/${id}/`).then(({ data }) => {
                if (data.ok) commit('storeSpreadsheetProjects', data.data)
                return data
            }).catch((err) => {
                console.log(err)
                return err.response.data
            })
        },
        async getSpreadsheetsData({ commit }, payload = { id: 0, service: '', spreadsheetId: "" }) {
            if (!payload.spreadsheetId) {
                commit('clearSheetData');
                return false;
            }
            return axiosClient.get(`/spreadsheet/${payload.id}/${payload.spreadsheetId}/sheets`).then(({ data }) => {
                if (data.ok) commit('storeSheets', { spreadsheetId: payload.spreadsheetId, data: data.data });
                return data;
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
        async createSpreadsheet({ commit }, payload) {
            return axiosClient.post(`/spreadsheet/${payload.id}/create`, payload.payload).then(({ data }) => {
                console.log(data)
                if (data.ok) commit('putSpreadsheetData', data.data)
                return data;
            }).catch((err) => {
                console.log(err)
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
        async importSpreadsheet({ commit }, payload) {
            return axiosClient.post(`/spreadsheet/${payload.id}/import`, payload.payload).then(({ data }) => {
                console.log(data)
                if (data.ok) commit('putSpreadsheetData', data.data)
                return data;
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
        async updateSpreadsheet({ commit }, payload) {
            return axiosClient.put(`/spreadsheet/${payload.id}/${payload.spreadsheetId}`, payload.payload).then(({ data }) => {
                if (data.ok) commit('updateSpreadsheetData', data.data)
                return data;
            }).catch((err) => {
                return err.response
            })
        },
        async deleteSpreadsheet({ commit }, setting = { pid: 0, spreadsheetId: '' }) {
            return axiosClient.delete(`/service/${setting.pid}/${setting.spreadsheetId}`, {
                headers: {
                    "Service-Type": "SPREADSHEET"
                }
            }).then(({ data }) => {
                if (data.ok) commit('removeSpreadsheet', setting.spreadsheetId);
                return data
            })
        },
        async createSheet({ commit }, payload) {
            return axiosClient.post(`/spreadsheet/${payload.id}/${payload.spreadsheetId}/sheets`, payload.payload).then(({ data }) => {
                console.log(data)
                if (data.ok) commit('putSheetData', { id: payload.spreadsheetId, data: data.data.sheet })
                return data;
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
        async updateSheet({ commit }, payload) {
            return axiosClient.put(`/spreadsheet/${payload.id}/${payload.spreadsheetId}/${payload.sheetId}`, payload.payload).then(({ data }) => {
                if (data.ok) commit('updateSheetData', { id: payload.spreadsheetId, data: data.data })
                return data;
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
    },
    mutations: {
        storeSpreadsheetProjects: (state, data) => {
            state.data = data;
        },
        storeSheets: (state, data) => {
            console.log(data)
            state.sheets = data
        },
        clearSheetData: (state) => {
            state.sheets = {}
        },
        putSpreadsheetData: (state, data) => {
            state.data.push(data)
        },
        updateSpreadsheetData: (state, data) => {
            let index = itechObject(state.data).find(data.refId, 'refId');
            console.log(index, data, state.data)
            state.data[index] = data
        },
        removeSpreadsheet: (state, spreadsheetId) => {
            let index = itechObject(state.data).find(spreadsheetId, 'refId');
            state.data.splice(index, 1)
        },
        putSheetData: (state, data) => {
            state.sheets.data.data.push(data.data)
        },
        updateSheetData: (state, data) => {
            let index = itechObject(state.sheets.data.data).find(data.data.sheetId, "sheetId")
            state.sheets.data.data[index] = {
                "name": data.data.name,
                "sheetId": data.data.sheetId
            }
        }
    }
}

const sheetData = {
    state: () => ({
        data: {}
    }),
    actions: {
        async getSheetDetailData({ commit }, payload) {
            return axiosClient.get(
                    `/spreadsheet/${payload.id}/${payload.spreadsheetId}/${payload.sheetId}?range=${payload.range}`)
                .then(({ data }) => {
                    if (data.ok) commit('putSheetDetailData', data.data)
                    return data
                })
        }
    },
    mutations: {
        putSheetDetailData: (state, data) => {
            state.data = data
        }
    }
}

const authModule = {
    state: () => ({
        status: true,
        tokenAlertBox: {
            show: false,
            closeable: true
        }
    }),
    actions: {
        async requestAuth({ commit }, id) {
            return axiosClient.get(`/auth/request/code/${id}?service=SPREADSHEET`).then((res) => {
                console.log(res)
                return res.data
            })
        },
        async authorize({ commit }, data) {
            const configs = {
                headers: {
                    service: data.service
                }
            }
            return axiosClient.post(`/auth/authorize/${data.id}`, { 'code': data.code }, configs).then(({ data }) => {
                return data
            }).catch((err) => {
                return err
            })
        },
        async checkStatus({ commit }, id) {
            return axiosClient.get(`/auth/${id}/status`).then(({ data }) => {
                console.log(data)
                commit('status', data)
                return data
            }).catch((err) => {
                commit('status', err.response.data)
                return err.response.data
            })
        }
    },
    mutations: {
        status: (state, data) => {
            console.log(data)
            state.status = data.ok
        }
    }
}
const notificationModule = {
    state: () => ({
        data: []
    }),
    actions: {
        putNotification({ commit }, data) {
            commit('putNoti', data)
        },
        addNotification({ commit }, data) {
            commit('addNoti', data)
        },
        clearNotifications({ commit }) {
            commit('clearNotifications')
        },
        removeNotification({ commit }, index) {
            commit('removeNotification', index)
        }
    },
    mutations: {
        putNoti: (state, data) => {
            state.data = data
        },
        addNoti: (state, data) => {
            let id = state.data.length;
            state.data.push(Object.assign(data, { id: id }))
        },
        clearNotifications: (state) => {
            state.data = []
        },
        removeNotification: (state, index) => {
            state.data.splice(index, 1)
        }
    }
}
const setting = {
    state: () => ({
        progress: false
    })
}
const drive = {
    state: () => ({
        user: null,
        storageQuota: null,
        drive: {
            folders: []
        }
    }),
    actions: {
        async getDriveInfo({ commit }, id) {
            return axiosClient.get(`/drive/${id}/info`).then(({ data }) => {
                if (data.ok) commit('driveInfo', data.data)
                return data
            }).catch(err => {
                return err
            })
        },
        async getDriveFolders({ commit }, id) {
            return axiosClient.get(`/drive/${id}/folders`).then(({ data }) => {
                if (data.ok) commit('putFolderData', data.data)
                return data
            })
        },
        async createDriveFolder({ commit }, payload) {
            return axiosClient.post(`/drive/${payload.id}/folder/create`, payload.payload)
                .then(({ data }) => {
                    if (data.ok) commit('addFolderData', data.data)
                    return data
                }).catch((err) => {
                    if (err.response && err.response.data) return err.response.data
                    return err
                })
        },
        async importDriveFolder({ commit }, payload) {
            return axiosClient.post(`/drive/${payload.id}/folders/import`, payload.payload).then(({ data }) => {
                if (data.ok) commit('addFolderData', data.data)
                return data
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        },
        async deleteDriveProjectFolder({ commit }, setting = { pid: 0, driveId: '' }) {
            return axiosClient.delete(`/service/${setting.pid}/${setting.driveId}`, {
                headers: {
                    "Service-Type": "DRIVE"
                }
            }).then(({ data }) => {
                if (data.ok) commit('removeDrive', setting.driveId);
                return data
            })
        },
    },
    mutations: {
        driveInfo: (state, data) => {
            state.user = data.user
            state.storageQuota = data.storageQuota
        },
        putFolderData: (state, data) => {
            state.drive.folders = data
        },
        addFolderData: (state, data) => {
            state.drive.folders.push(data)
        },
        removeDrive: (state, driveId) => {
            let index = itechObject(state.data).find(driveId, 'refId');
            state.drive.folders.splice(index, 1)
        }
    }
}
const driveFile = {
    state: () => ({
        file: {},
        children: []
    }),
    actions: {
        async getDriveFiles({ commit }, payload = { id: null, fileId: null }) {
            return axiosClient.get(`/drive/${payload.id}/drivefile/${payload.fileId}?files=${true}`)
                .then(({ data }) => {
                    if (data.ok) commit('putDriveFileData', data.data)
                    return data
                }).catch((err) => {
                    commit('reset')
                    if (err.response && err.response.data) return err.response.data
                    return err
                })
        },
        async downloadFile({ commit }, payload) {

            return await axiosClient.get(`/drive/${payload.id}/drivefile/${payload.fileId}/download`, {

                    responseType: "blob", // important
                    onDownloadProgress: (progressEvent) => {
                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
                        payload.loaded(percentCompleted)
                    }
                })
                .then((res) => {
                    payload.success(res)
                    return res
                }).catch((err) => {
                    if (err.response && err.response.data) return err.response.data
                    return err
                })
        }
    },
    mutations: {
        putDriveFileData: (state, data) => {
            state.file = data.file
            state.children = data.children
        },
        reset: (state) => {
            state.file = {},
                state.children = []
        }
    }
}
const prespectives = {
    state: () => ({
        drivefile: {}
    }),
    actions: {
        async openPrespective({ state }, payload) {
            return axiosClient.get(`/drive/${payload.id}/drivefile/${payload.fileId}/info`).then(({ data }) => {
                if (data.ok) {
                    state.drivefile = data.data
                } else {
                    state.drivefile = {}
                }
                return data
            }).catch((err) => {
                if (err.response && err.response.data) return err.response.data
                return err
            })
        }
    },
    mutations: {

    }
}
const multiSelect = {
    state: () => ({
        data: [],
        enable: false,
        target: null
    }),
    actions: {},
    mutations: {}
}
const store = createStore({
    modules: {
        user: userModule,
        auth: authModule,
        project: projectModule,
        services: servicesModule,
        spreadsheet: spreadsheetModule,
        notification: notificationModule,
        sheet: sheetData,
        setting: setting,
        drive,
        driveFile,
        prespectives,
        multiSelect
    }
})

export default store
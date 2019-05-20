/**
 * URL
 */
// const BASEURL = 'https://zjubiomedit.com/COPDService.svc/'
const BASEURL = 'https://patient.zjubiomedit.com/'
const getLastUrl = BASEURL + 'data/GetLastGenericRecords'
const fetchUrl = BASEURL + 'data/fetch'
const commitUrl = BASEURL + 'data/commit'
// const getLastUrl = BASEURL + 'GetLastGenericRecords'
// const fetchUrl = BASEURL + 'GetGenericRecords'
// const commitUrl = BASEURL + 'CommitGenericRecord'
const validateUrl = BASEURL + 'ValidateRegister'
const registUrl = BASEURL + 'WapRegistWithPatientInfo'
const loginUrl = BASEURL + 'WapLogin'
const provinceUrl = BASEURL + 'WapAllProvince'
const hospitalUrl = BASEURL + 'WapGetHospital'
const doctorUrl = BASEURL + 'WapGetDoctor'
const sendMessageUrl = BASEURL + 'data/MessageCommit'
const fetchMessageUrl = BASEURL + 'data/MessageFetch'
const updateMessageUrl = BASEURL + 'data/MessageUpdate'

/**
 * ICON and AUDIO
 */
const iconBaseUrl = 'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/icon/'
const audioBaseUrl = 'https://zju-bmi-assets.oss-cn-beijing.aliyuncs.com/wx-copd-manager/audio/'

/**
 * CLASS URL
 */
const videoBaseUrl = 'https://edu.zjubiomedit.com/health-knowledge/GetCOPDVideoInfo.jsp?'
const knoBaseUrl = 'https://copd.zjubiomedit.com/copd/message/'
const knoGetListUrl = knoBaseUrl + 'getKnoListPaging?'
const knoGetContentUrl = knoBaseUrl + 'get?knoId='
const knoLikeUrl = knoBaseUrl + 'recordFavorite?'
const knoReadUrl = knoReadUrl + 'recordIfRead?'
const knoNewUserUrl = knoBaseUrl + 'updateNewUserKnowledge?newUserId='
export {
    getLastUrl,
    fetchUrl,
    commitUrl,
    validateUrl,
    registUrl,
    loginUrl,
    provinceUrl,
    hospitalUrl,
    doctorUrl,
    //
    iconBaseUrl,
    audioBaseUrl,
    //
    videoBaseUrl,
    knoGetListUrl,
    knoGetContentUrl,
    knoLikeUrl,
    knoReadUrl,
    knoNewUserUrl,
    //
    sendMessageUrl,
    fetchMessageUrl,
    updateMessageUrl
}
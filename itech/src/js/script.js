import zipFile from '../assets/img/icons/zip-icon.png';
import textFile from '../assets/img/icons/text-icon.png';
import unknowFile from '../assets/img/icons/unknow-icon.png';
import excel from '../assets/img/icons/Google_Sheets_Logo.svg'
import pdf from '../assets/img/icons/pdf-icon.png';
import docx from '../assets/img/icons/docx-icon.png';
import archive from '../assets/img/icons/archive-icon.png';
import folder from '../assets/img/icons/folder-icon.svg';
import video from '../assets/img/icons/video-icon.svg'
import audio from '../assets/img/icons/mp3.svg'

export const BASE_API_URL = `http://localhost:8001/itech/api`

export const spreadsheet = {
    getRange: (range = "") => {
        if (!range.includes("!") || !range.includes(":")) return null;
        if (range.includes("!")) {}
        let match = range.includes("!") ? range.split("!")[1] : range
        let ranges = match.includes(":") ? match.split(":") : [match]
        let data = {
            start: {
                range: ``,
                index: 0
            },
            end: {
                range: ``,
                index: 0
            }
        }
        let startN = ranges[0].search(/\d/)
        if (startN > 0) {
            data.start.range = ranges[0].substring(0, startN)
            data.start.index = parseInt(ranges[0].substring(startN, ranges[0].length))
        } else {
            data.start.range = ranges[0]
            data.start.index = 1
        }

        let endN = ranges[0].search(/\d/)
        if (endN > 0) {
            data.end.range = ranges[1].substring(0, endN)
            data.end.index = parseInt(ranges[1].substring(endN, ranges[1].length))
        } else {
            data.end.range = ranges[1]
            data.end.index = 1
        }
        return data
    }
}
export const fileTypeLogo = (type) => {
    switch (type) {
        case "txt":
            {
                return textFile
            }
        case "zip":
            {
                return zipFile
            }
        case "xlsx":
            {
                return excel
            }
        case "unknow":
            {
                return unknowFile
            }
        case "pdf":
            {
                return pdf
            }
        case "docx":
            {
                return docx
            }
        case "archived":
            {
                return archive
            }
        case "drive-folder":
            {
                return folder
            }
        case "video":
            {
                return video
            }
        case "audio":
            {
                return audio
            }
        default:
            {
                return unknowFile
            }
    }
}
export const getImageData = (pid, id) => {
    return `${BASE_API_URL}/drive/${pid}/drivefile/photo/${id}?u_token=${sessionStorage.getItem('TOKEN')}`
}

export const FACEBOOK_SCOPES = [
    "ads_management", "ads_read", "attribution_read", "business_management", "catalog_management", "email",
    "gaming_user_locale", "groups_access_member_info", "instagram_basic", "instagram_content_publish", "instagram_manage_comments",
    "instagram_manage_insights", "instagram_shopping_tag_products", "page_events", "pages_manage_ads", "pages_manage_cta", "pages_manage_instant_articles",
    "pages_manage_engagement", "pages_manage_metadata", "pages_manage_posts", "pages_messaging", "pages_read_engagement", "pages_read_user_content",
    "pages_show_list", "pages_user_gender", "pages_user_locale", "pages_user_timezone", "private_computation_access", "public_profile",
    "publish_to_groups", "publish_video", "read_insights", "user_age_range", "user_birthday", "user_friends", "user_gender", "user_hometown",
    "user_likes", "user_link", "user_location", "user_messenger_contact", "user_photos", "user_posts", "user_videos", "whatsapp_business_management",
    "whatsapp_business_messaging"
]

export default { spreadsheet, fileTypeLogo, BASE_API_URL, FACEBOOK_SCOPES }
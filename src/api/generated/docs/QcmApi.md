# QcmApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiQcmBulkPost**](#apiqcmbulkpost) | **POST** /api/Qcm/bulk | |
|[**apiQcmGet**](#apiqcmget) | **GET** /api/Qcm | |
|[**apiQcmIdDelete**](#apiqcmiddelete) | **DELETE** /api/Qcm/{id} | |
|[**apiQcmIdGet**](#apiqcmidget) | **GET** /api/Qcm/{id} | |
|[**apiQcmIdPatch**](#apiqcmidpatch) | **PATCH** /api/Qcm/{id} | |
|[**apiQcmPost**](#apiqcmpost) | **POST** /api/Qcm | |

# **apiQcmBulkPost**
> apiQcmBulkPost()


### Example

```typescript
import {
    QcmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

let createQcmDto: Array<CreateQcmDto>; // (optional)

const { status, data } = await apiInstance.apiQcmBulkPost(
    createQcmDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createQcmDto** | **Array<CreateQcmDto>**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiQcmGet**
> Array<QcmDto> apiQcmGet()


### Example

```typescript
import {
    QcmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

const { status, data } = await apiInstance.apiQcmGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<QcmDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiQcmIdDelete**
> apiQcmIdDelete()


### Example

```typescript
import {
    QcmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiQcmIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiQcmIdGet**
> QcmDto apiQcmIdGet()


### Example

```typescript
import {
    QcmApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiQcmIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**QcmDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiQcmIdPatch**
> apiQcmIdPatch()


### Example

```typescript
import {
    QcmApi,
    Configuration,
    UpdateQcmDto
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

let id: number; // (default to undefined)
let updateQcmDto: UpdateQcmDto; // (optional)

const { status, data } = await apiInstance.apiQcmIdPatch(
    id,
    updateQcmDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateQcmDto** | **UpdateQcmDto**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiQcmPost**
> QcmDto apiQcmPost()


### Example

```typescript
import {
    QcmApi,
    Configuration,
    CreateQcmDto
} from './api';

const configuration = new Configuration();
const apiInstance = new QcmApi(configuration);

let createQcmDto: CreateQcmDto; // (optional)

const { status, data } = await apiInstance.apiQcmPost(
    createQcmDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createQcmDto** | **CreateQcmDto**|  | |


### Return type

**QcmDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


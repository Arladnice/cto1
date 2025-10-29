# GroupApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDataGeneralGroupGet**](#apidatageneralgroupget) | **GET** /api/Data/GeneralGroup | |
|[**apiDataTableGroupGet**](#apidatatablegroupget) | **GET** /api/Data/TableGroup | |

# **apiDataGeneralGroupGet**
> Array<GeneralIndicators> apiDataGeneralGroupGet()


### Example

```typescript
import {
    GroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GroupApi(configuration);

let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)
let generalGroup: GeneralGroup; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataGeneralGroupGet(
    startDate,
    endDate,
    generalGroup
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|
| **generalGroup** | **GeneralGroup** |  | (optional) defaults to undefined|


### Return type

**Array<GeneralIndicators>**

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

# **apiDataTableGroupGet**
> Array<FieldStatDto> apiDataTableGroupGet()


### Example

```typescript
import {
    GroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GroupApi(configuration);

let date: string; // (optional) (default to undefined)
let dateEnd: string; // (optional) (default to undefined)
let tableGroup: TableGroup; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataTableGroupGet(
    date,
    dateEnd,
    tableGroup
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **dateEnd** | [**string**] |  | (optional) defaults to undefined|
| **tableGroup** | **TableGroup** |  | (optional) defaults to undefined|


### Return type

**Array<FieldStatDto>**

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


# DataApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDataGetDataGet**](#apidatagetdataget) | **GET** /api/Data/GetData | |
|[**apiDataGetFieldGet**](#apidatagetfieldget) | **GET** /api/Data/GetField | |
|[**apiDataGetFiltersGet**](#apidatagetfiltersget) | **GET** /api/Data/GetFilters | |
|[**apiDataGetQcmsGet**](#apidatagetqcmsget) | **GET** /api/Data/GetQcms | |

# **apiDataGetDataGet**
> Array<SignalCounterAggregatedDto> apiDataGetDataGet()


### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let idPar: number; // (optional) (default to undefined)
let date: string; // (optional) (default to undefined)
let agg: AggregationType; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataGetDataGet(
    idPar,
    date,
    agg
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **idPar** | [**number**] |  | (optional) defaults to undefined|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **agg** | **AggregationType** |  | (optional) defaults to undefined|


### Return type

**Array<SignalCounterAggregatedDto>**

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

# **apiDataGetFieldGet**
> FieldValuesResponse apiDataGetFieldGet()


### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let fieldName: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataGetFieldGet(
    fieldName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fieldName** | [**string**] |  | (optional) defaults to undefined|


### Return type

**FieldValuesResponse**

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

# **apiDataGetFiltersGet**
> apiDataGetFiltersGet()


### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let idPar: number; // (optional) (default to undefined)
let startDate: string; // (optional) (default to undefined)
let endDate: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataGetFiltersGet(
    idPar,
    startDate,
    endDate
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **idPar** | [**number**] |  | (optional) defaults to undefined|
| **startDate** | [**string**] |  | (optional) defaults to undefined|
| **endDate** | [**string**] |  | (optional) defaults to undefined|


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

# **apiDataGetQcmsGet**
> QcmCursorResult apiDataGetQcmsGet()


### Example

```typescript
import {
    DataApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DataApi(configuration);

let cursor: number; // (optional) (default to undefined)
let limit: number; // (optional) (default to 100)
let sortBy: Array<string>; // (optional) (default to undefined)
let sortDirection: Array<string>; // (optional) (default to undefined)
let paramName: Array<string>; // (optional) (default to undefined)
let subsidiaryCompany: Array<string>; // (optional) (default to undefined)
let field: Array<string>; // (optional) (default to undefined)
let typeObject1: Array<string>; // (optional) (default to undefined)
let typeObject2: Array<string>; // (optional) (default to undefined)
let techPosition: Array<string>; // (optional) (default to undefined)
let techPositionCode: Array<string>; // (optional) (default to undefined)
let department: Array<string>; // (optional) (default to undefined)
let serviceOrganization: Array<string>; // (optional) (default to undefined)
let contractNumber: Array<string>; // (optional) (default to undefined)
let typeSiSa: Array<string>; // (optional) (default to undefined)
let factoryNumberSiSa: Array<string>; // (optional) (default to undefined)
let signalType: Array<string>; // (optional) (default to undefined)
let groupSiSa: Array<string>; // (optional) (default to undefined)
let criticalLevel: Array<string>; // (optional) (default to undefined)
let expectedSignals: Array<string>; // (optional) (default to undefined)
let qsmSignal: Array<string>; // (optional) (default to undefined)
let descriptionServiceOrganization: Array<string>; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataGetQcmsGet(
    cursor,
    limit,
    sortBy,
    sortDirection,
    paramName,
    subsidiaryCompany,
    field,
    typeObject1,
    typeObject2,
    techPosition,
    techPositionCode,
    department,
    serviceOrganization,
    contractNumber,
    typeSiSa,
    factoryNumberSiSa,
    signalType,
    groupSiSa,
    criticalLevel,
    expectedSignals,
    qsmSignal,
    descriptionServiceOrganization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **cursor** | [**number**] |  | (optional) defaults to undefined|
| **limit** | [**number**] |  | (optional) defaults to 100|
| **sortBy** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **sortDirection** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **paramName** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **subsidiaryCompany** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **field** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **typeObject1** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **typeObject2** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **techPosition** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **techPositionCode** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **department** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **serviceOrganization** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **contractNumber** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **typeSiSa** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **factoryNumberSiSa** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **signalType** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **groupSiSa** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **criticalLevel** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **expectedSignals** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **qsmSignal** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **descriptionServiceOrganization** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|


### Return type

**QcmCursorResult**

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


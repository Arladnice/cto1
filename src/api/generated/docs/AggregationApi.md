# AggregationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDataEndpointsPost**](#apidataendpointspost) | **POST** /api/Data/endpoints | |

# **apiDataEndpointsPost**
> apiDataEndpointsPost()


### Example

```typescript
import {
    AggregationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AggregationApi(configuration);

let idPar: number; // (optional) (default to undefined)
let dtStart: string; // (optional) (default to undefined)
let dtEnd: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiDataEndpointsPost(
    idPar,
    dtStart,
    dtEnd
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **idPar** | [**number**] |  | (optional) defaults to undefined|
| **dtStart** | [**string**] |  | (optional) defaults to undefined|
| **dtEnd** | [**string**] |  | (optional) defaults to undefined|


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


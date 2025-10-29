# ChartsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiChartsGetChartsByMonthsGet**](#apichartsgetchartsbymonthsget) | **GET** /api/Charts/GetChartsByMonths | |
|[**apiChartsGetGeneralCounterGet**](#apichartsgetgeneralcounterget) | **GET** /api/Charts/GetGeneralCounter | |
|[**apiChartsGetQualityCounterGet**](#apichartsgetqualitycounterget) | **GET** /api/Charts/GetQualityCounter | |

# **apiChartsGetChartsByMonthsGet**
> Array<MonthsCharts> apiChartsGetChartsByMonthsGet()


### Example

```typescript
import {
    ChartsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChartsApi(configuration);

const { status, data } = await apiInstance.apiChartsGetChartsByMonthsGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<MonthsCharts>**

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

# **apiChartsGetGeneralCounterGet**
> DonutCharts apiChartsGetGeneralCounterGet()


### Example

```typescript
import {
    ChartsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChartsApi(configuration);

let date: string; // (optional) (default to undefined)
let dateEnd: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiChartsGetGeneralCounterGet(
    date,
    dateEnd
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **dateEnd** | [**string**] |  | (optional) defaults to undefined|


### Return type

**DonutCharts**

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

# **apiChartsGetQualityCounterGet**
> QualityCounter apiChartsGetQualityCounterGet()


### Example

```typescript
import {
    ChartsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ChartsApi(configuration);

let date: string; // (optional) (default to undefined)
let dateEnd: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiChartsGetQualityCounterGet(
    date,
    dateEnd
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **date** | [**string**] |  | (optional) defaults to undefined|
| **dateEnd** | [**string**] |  | (optional) defaults to undefined|


### Return type

**QualityCounter**

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


#include <node_api.h>
#include "sort_algorithms.h"
#include <algorithm>
#include <vector>
#include "../helpers/helpers.h"

namespace addon
{
    void heapify(std::vector<int> &arr, int n, int i);

    napi_value heap_sort(napi_env env, napi_callback_info info)
    {
        vector<int> elements = get_elements_of_array(env, info);
        int n = elements.size();

        // Build max heap (rearrange elements)
        for (int i = n / 2 - 1; i >= 0; --i)
            heapify(elements, n, i);

        // One by one extract elements from heap
        for (int i = n - 1; i > 0; --i)
        {
            // Move current root to end
            swap(elements[0], elements[i]);

            // call max heapify on the reduced heap
            heapify(elements, i, 0);
        }
        return convert_to_napi_array(env, elements);
    }

    void heapify(std::vector<int> &arr, int n, int i)
    {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // If left child is larger than root
        if (left < n && arr[left] > arr[largest])
            largest = left;

        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest])
            largest = right;

        // If largest is not root
        if (largest != i)
        {
            std::swap(arr[i], arr[largest]);

            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
}
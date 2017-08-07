﻿// Customers api for rest operations
$(function () {

    var table = $("#customers").DataTable(
    {
        ajax: {
            url: "/api/customers",
            dataSrc: ""
        },
        columns: [
            {
                data: "name",
                render: function(data, type, customer) {
                    return "<a href='/customers/edit/" + customer.id + "'>" + customer.name;
                }
            },
            {
                data: "membershipType.name"  
            },
            {
                data: "id",
                render: function(data, type, customer) {
                    return "<button class='btn btn-sm btn-warning js-delete' data-customer-id=" + data + " data-customer-full-name='" + customer.name + "'><span class='glyphicon glyphicon-minus-sign'></span> Delete</button>";
                }
            }
        ]
    }); 

    $("#customers").on("click", ".js-delete", function () {
        var button = $(this);
        //var isSuccess = false;
        bootbox.confirm("Are you sure you wish to delete customer <b>" + button.data().customerFullName + "</b>?", function (result) {
            if (result) {
                $.ajax({
                    url: "/api/customers/" + button.data().customerId,
                    method: "DELETE",
                    success: function () {
                        console.log("success");
                        //isSuccess = true;
                        table.row(button.parents("tr")).remove().draw();
                    }
                });
            }
            //if (isSuccess) console.log(button.data().customerFullName + " has been deleted.");
        });

    });

});
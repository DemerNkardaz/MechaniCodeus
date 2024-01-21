$(document).ready(function () {
    var accessToken = '';

    function getGitHubCommits(page = 1) {
        var apiUrl = 'https://api.github.com/repos/DemerNkardaz/MechaniCodeus/commits';

        var commitsContainer = $('#commits-container');
        if (commitsContainer.find('tr').length === 0) {
            var headers = {};
            if (accessToken) {
                headers['Authorization'] = 'Bearer ' + accessToken;
            }

            $.ajax({
                url: apiUrl + `?per_page=100&page=${page}`,
                headers: headers,
                success: function (data) {
                    var totalCommits = data.length;

                    data.forEach(function (commit, i) {
                        var commitMessage = commit.commit.message;
                        var commitAuthor = commit.commit.author.name;
                        var commitFilesUrl = commit.commit.tree.url;
                        var commitDate = commit.commit.author.date;

                        // Сделаем запрос для получения данных о файлах
                        $.ajax({
                            url: commitFilesUrl,
                            headers: headers,
                            success: function (filesData) {
                                // Получим имена файлов
                                var fileNames = filesData.tree.map(function (file) {
                                    return file.path;
                                });

                                var rowNumber = totalCommits - (page - 1) * 100 - i;

                                var commitRow = '<tr>';
                                commitRow += '<td>' + rowNumber + '</td>';
                                commitRow += '<td>' + commitAuthor + '</td>';
                                commitRow += '<td>' + commitMessage + '</td>';
                                commitRow += '<td>' + commitDate + '</td>';
                                commitRow += '</tr>';
                                commitsContainer.append(commitRow);

                                var filesRow = '<tr class="files-row">';
                                filesRow += '<td colspan="4">' + fileNames.join(', ') + '</td>';
                                filesRow += '</tr>';
                                commitsContainer.append(filesRow);
                            }
                        });
                    });

                    if (data.length === 100) {
                        getGitHubCommits(page + 1);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    if (accessToken && xhr.status === 401) {
                        // Unauthorized only if token was provided
                        var errorParagraph = '<p data-key="APIUnauthorizedError">Unauthorized access. Please check your access token.</p>';
                        commitsContainer.after(errorParagraph);
                    } else if (xhr.status === 403 && xhr.responseJSON && xhr.responseJSON.message === "API rate limit exceeded for xxx.xxx.xxx.xxx.") {
                        // API rate limit exceeded
                        var errorParagraph = '<p data-key="APIRateLimitError">API rate limit exceeded. Please try again later.</p>';
                        commitsContainer.after(errorParagraph);
                    }
                }
            });
        }
    }

    function gitHubCompiled() {
        getGitHubCommits();
        $('#dummyGitBlank').fadeToggle('slow').css('display', 'flex');
    }

    $(document).on('click', '#VersionsInfo', gitHubCompiled);
});

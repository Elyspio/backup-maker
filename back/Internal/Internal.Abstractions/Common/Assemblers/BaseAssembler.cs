namespace BackupMaker.Api.Abstractions.Common.Assemblers;

/// <summary>
///     Convert an object of <see cref="TA" /> to a <see cref="TB" /> and inversely
/// </summary>
/// <typeparam name="TA"></typeparam>
/// <typeparam name="TB"></typeparam>
public abstract class BaseAssembler<TA, TB>
{
	/// <summary>
	///     Convert an object of <see cref="TA" /> to a <see cref="TB" />
	/// </summary>
	public abstract TB Convert(TA obj);

	/// <summary>
	///     Convert an object of <see cref="TB" /> to a <see cref="TA" />
	/// </summary>
	public abstract TA Convert(TB obj);


	/// <summary>
	///     Convert a list <see cref="TA" /> to a list of <see cref="TB" />
	/// </summary>
	public IEnumerable<TB> Convert(IEnumerable<TA> objs)
	{
		return objs.Select(Convert).ToList();
	}

	/// <summary>
	///     Convert a enumerable of <see cref="TB" /> to a enumerable  of <see cref="TA" />
	/// </summary>
	public IEnumerable<TA> Convert(IEnumerable<TB> objs)
	{
		return objs.Select(Convert).ToList();
	}

	/// <summary>
	///     Convert a list of <see cref="TA" /> to a list  of <see cref="TB" />
	/// </summary>
	public List<TB> Convert(List<TA> objs)
	{
		return objs.Select(Convert).ToList();
	}

	/// <typeparam name="TA"></typeparam>
	/// <typeparam name="TB"></typeparam>
	/// <summary>
	///     Convert a list of <see cref="TB" /> to a list of <see cref="TA" />
	/// </summary>
	public List<TA> Convert(List<TB> objs)
	{
		return objs.Select(Convert).ToList();
	}
}